import axios from "axios";
import {toast} from "sonner";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors) && err?.data.errors.length > 0) {
      for (let val of err?.data.errors) {
        toast.error('Validation error!', {
          description: val,
        });
      }
    } else if (typeof err?.data.errors === "object" && err?.data.errors.length > 0) {
      for (let e in err?.data.errors) {
        toast.error('Validation error!', {
          description: err.data.errors[e][0],
        });
      }
    } else if (err?.data) {
      toast.error('Validation error!', {
        description: err.data.message,
      });
    } else if (err?.status == 401) {
      toast.error("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.error('Validation error!', {
        description: err?.data.message,
      });
    }
  }
};
