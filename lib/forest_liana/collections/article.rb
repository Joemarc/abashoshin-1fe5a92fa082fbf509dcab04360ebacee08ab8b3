class Forest::Article
  include ForestLiana::Collection

  collection :Article

  action 'publish_article'
  action 'republish_article'

  field :article_url, type: 'String' do
    shoshin_url + "/articles/#{object.slug}"
  end

  field :Comments_count, type: 'Number' do
    comments = Comment.where('commentable_id = ? AND commentable_type = ?', object.id, 'Article').count
    comments.to_s
  end
end