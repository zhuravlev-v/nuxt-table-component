import Comments from "@/service/comments";

export default (context, inject) => {
 const factories = {
  comments: Comments(context.$axios),
 };

 inject("api", factories);
};