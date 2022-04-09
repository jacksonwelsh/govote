<script>
  import TextInput from '$lib/input/text.svelte';

  let username = '';
  let password = '';

  const submit = () => {};
</script>

<div class="my-auto flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <h2 class="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
    <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
      Or
      <a
        href="/auth/register"
        class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
      >
        create a new account
      </a>
    </p>
  </div>

  <form on:submit|preventDefault={submit} class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow dark:bg-slate-800 sm:rounded-lg sm:px-10">
      <form class="space-y-6" action="#" method="POST">
        <div class="my-2">
          <div class="my-2">
            <TextInput autocomplete="username" required label="Username" bind:value={username} />
          </div>
        </div>

        <div class="my-2">
          <div class="my-2">
            <TextInput
              type="password"
              autocomplete="current-password"
              required
              label="Password"
              bind:value={password}
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="remember-me" class="ml-2 block text-sm"> Remember me </label>
          </div>

          <div hidden class="text-sm">
            <a href="/auth/forgor" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >Sign in</button
          >
        </div>
      </form>
    </div>
  </form>
</div>
