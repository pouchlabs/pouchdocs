<script lang="ts">
    import {Tooltip,Button,NavItem,Tabs,Icon,Card,Menu,Dialog,MenuItem,Toggle} from "svelte-ux";
    import { page } from '$app/stores';
    
  let options = [
    { label: 'dashboard', value: 1 },
    { label: 'users', value: 2 },
    
  ];

  let value = 1;
  let open1 = false
    </script>
    <main class="flex flex-row gap-3">
        <aside class="bg-primar sticky top-[55px] flex flex-col flex-grow-0 flex-shrink-0 w-[40px] h-[70vh] shadow-m px-2 my-2 rounded">
            <Tooltip title='dashboard'  placement='right'>
           
                <NavItem class='flex my-2 flex-col w-[30px] h-[30px] justify-center p-0 shadow-md rounded-full' path='/dashboard' currentUrl={$page.url}>
                  <Icon >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.21 2H8.75A6.76 6.76 0 0 0 2 8.75v6.5A6.76 6.76 0 0 0 8.75 22h6.5A6.76 6.76 0 0 0 22 15.25v-6.5A6.76 6.76 0 0 0 15.21 2M8.43 16.23a.8.8 0 1 1-1.6 0v-5.1a.8.8 0 0 1 1.6 0zm4.45 0a.8.8 0 1 1-1.6 0V7.78a.8.8 0 0 1 1.6 0zm4.21 0a.8.8 0 1 1-1.6 0V9.82a.8.8 0 0 1 1.6 0z" />
                    </svg> 
                  </Icon>
                </NavItem>
             
             
            </Tooltip>
            <Tooltip title='documents'  placement='right'>
           
              <NavItem class='flex flex-col w-[30px] h-[30px] my-2 justify-center p-0 shadow-md rounded-full' path='/dashboard/documents' currentUrl={$page.url}>
                <Icon >
                  <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/></svg>
                </Icon>
              </NavItem> 
          </Tooltip>
        </aside>
        <section>
           <slot />
        </section>
       </main>