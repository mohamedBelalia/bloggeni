export interface IBlogData {
    title : string 
    keywords : string
    language : string | undefined
    size : string | undefined
    tone : string | undefined
    details : string | undefined
}


export interface IRetrivedBlog {
    user_id : string 
    title : string
    id_blog : string
    created_at : string
    content : string
}