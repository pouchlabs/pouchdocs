import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
  const user = locals.user;
  return {user};
};

export const actions = {
  logout: async ({cookies}) => {
    cookies.delete("AuthorizationToken",{path:"/"});
    throw  redirect(302, "/auth");
  }
}
