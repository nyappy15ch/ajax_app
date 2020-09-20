class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false)#falseを付けた理由は未読と判断するため。
    render json: { post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    item = Post.find(params[:id])
    render json: { post: item }#itemを代入しているpost変数がレスポンスで使用できるようになる
    #レスポンスをjson形式で返すためにrenderを使用している。
  end
  
end
