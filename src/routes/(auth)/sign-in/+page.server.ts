import { db, isValidEmail } from '$lib/shared/lib';
import { lucia } from '$lib/shared/model';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

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
		}

		const user = await db.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user) {
			return fail(404, { path: 'email', message: 'User not found' });
		}

		const validPassword = await new Argon2id().verify(user.hashed_password, password);

		if (!validPassword) {
			return fail(403, { path: 'password', message: 'Incorrect password' });
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			...sessionCookie.attributes,
			path: sessionCookie.attributes.path as string
		});
		return redirect(302, '/');
	}
} satisfies Actions;
