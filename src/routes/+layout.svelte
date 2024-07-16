<script lang="ts">
	import { AppBar, AppLayout, Avatar,Collapse, Button, NavItem, Tooltip, settings,ThemeSelect,Toggle,Menu,MenuItem} from 'svelte-ux';
	import { page } from '$app/stores';
	import '../app.postcss';
	export let data;
	settings({
		components: {
			AppBar: {
				classes: 'bg-primary text-white shadow-xl '
			},
			AppLayout: {
				classes: {
					nav: 'bg-neutral-400 py-8 shadow-xl'
				}
			},
			NavItem: {
				classes: {
					root: 'text-sm text-gray-400 pl-6 py-2 hover:text-white hover:bg-gray-300/10 [&:where(.is-active)]:text-primary [&:where(.is-active)]:bg-gray-500/10'
				}
			}
		}
	});
</script>

<AppLayout>
	<svelte:fragment slot="nav">
		<NavItem
			path="/"
			text="Home"
			icon="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
			currentUrl={$page.url}
		/>

		<NavItem
			path="/sponsor"
			text="sponsor"
		
			currentUrl={$page.url}
		/>
		

	 <Collapse name="documentation" class="text-slate-100 " >
		{#if data.docs}
		{#each data.docs.documents as doc}
		<NavItem
		path={`/docs/${doc.title}`}
		text="{doc.title}"
		currentUrl={$page.url}
	/>
	{/each}
	{/if}
	 </Collapse>
	   {#if !data.user}
	   <NavItem
	   path="/auth/login"
	   text="login"
	  
	   currentUrl={$page.url}
         />
		
	   {/if}
	</svelte:fragment>

	<AppBar title="pouchdocs" >
		<div slot="actions" class="flex gap-3">
		

			<Tooltip title="View repository" placement="left" offset={2}>
				<Button
					icon="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
					href="https://github.com/pouchlabs/pouchdocs"
					class="p-2"
					target="_blank"
				/>
			</Tooltip>
			<ThemeSelect></ThemeSelect>
			{#if data.user}
			<Toggle let:on={open} let:toggle let:toggleOff>
				<Button on:click={toggle}>
					<Tooltip title={data.user.name} placement="left" offset={2}>
					<Avatar class="border w-[30px] h-[30px]">{data.user.name.slice(0,2)} </Avatar> 
					</Tooltip>
				  <Menu {open} on:close={toggleOff} class="px-3">
					 {#if  data.user.isadmin}
					 <MenuItem></MenuItem>
					 <span>{data.user.email}</span>
					 <Button
					 href="/dashboard"
					 currentUrl={$page.url}
					 
					   >dashboard</Button>
					 {/if}
					 <MenuItem>
						<NavItem
					path="/auth"
					text="logout"
				    currentUrl={$page.url}
					  />
          
					</MenuItem>
					
				  </Menu>
				</Button>
			  </Toggle>
			  {/if}
		</div>
	</AppBar>
    <main class="mt-[45px] bg-gray-200 dark:bg-[#2c2c2c22]">
		<slot />
	
	</main>
	
</AppLayout>
