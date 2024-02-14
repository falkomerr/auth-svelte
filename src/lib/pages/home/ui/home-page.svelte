<script lang="ts">
	import { Navbar } from '$lib/widgets/navbar';
	import HomeIcon from './home-icon.svelte';

	interface INavItem {
		name: string;
		link: string;
		icon: any;
	}

	const navItems: INavItem[] = [
		{
			name: 'Home',
			link: '/',
			icon: HomeIcon
		},
		{
			name: 'Home',
			link: '/',
			icon: HomeIcon
		},
		{
			name: 'Home',
			link: '/',
			icon: HomeIcon
		}
	];
</script>

<div class="h-[300vh]"></div>
<Navbar {navItems} />
