import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { GitHub } from 'arctic';

export const github = new GitHub(GITHUB_ID, GITHUB_SECRET);
