import {fail, redirect} from "@sveltejs/kit";
import {setAuthToken} from "../helpers.js";
import {loginUser} from "$lib/server/user.ts";

export const actions = {
  login: async ({cookies, request}) => {
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;

    const {error, token} = await loginUser(email, password);

    if (error) {
      return fail(500, {error});
    }

    setAuthToken({cookies, token});

    throw redirect(302, "/auth")
  }
}

