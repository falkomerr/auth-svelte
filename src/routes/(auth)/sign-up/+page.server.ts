import { db, isValidEmail } from '$lib/shared/lib';
import { lucia } from '$lib/shared/model';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username');

		if (!username || typeof username !== 'string') {
			return fail(400, { path: 'username', message: 'Username is required' });
		}

		const email = formData.get('email');

		if (!email || typeof email !== 'string') {
			return fail(400, { path: 'email', message: 'Email is required' });
		} else if (!isValidEmail(email)) {
			return fail(400, {
				path: 'email',
				message: 'Please, enter a valid email, e.g. test@example.com'
			});
		}

		const password = formData.get('password');

		if (!password || typeof password !== 'string') {
			return fail(400, { path: 'password', message: 'Password is required' });
		} else if (password.length < 6) {
			return fail(400, {
				path: 'password',
				message: 'Password should be at least 6 characters long'
			});
		}

		const exsistingUser = await db.user.findUnique({
			where: {
				email: email
			}
		});

		if (exsistingUser) {
			return fail(409, { path: 'email', message: 'Email already in use' });
		}

		const hashedPassword = await new Argon2id().hash(password);
		const userId = generateId(15);

		await db.user.create({
			data: {
				id: userId,
				username: username,
				email: email,
				hashed_password: hashedPassword
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: sessionCookie.attributes.path as string
		});
		return redirect(302, '/');
	}
} satisfies Actions;
