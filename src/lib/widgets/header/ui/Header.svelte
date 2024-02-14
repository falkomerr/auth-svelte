<script>
	import { A, Button, P } from 'flowbite-svelte';
</script>

<header class="w-full flex justify-between gap-x-5 py-2 px-3">
	<P>LOGO</P>
	<nav class="flex gap-x-5"></nav>
	<nav class="flex gap-x-2">
		<A href="/sign-in">
			<Button>SignIn</Button>
		</A>
		<A href="/sign-up">
			<Button>SignUp</Button>
		</A>
	</nav>
</header>
