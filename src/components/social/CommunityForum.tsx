import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const CommunityForum = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "EcoBeauty Enthusiast",
      content: "Just discovered an amazing vegan moisturizer! It's completely paraben-free and works wonders.",
      likes: 15,
      comments: 3,
    },
    {
      id: 2,
      author: "Sustainable Beauty",
      content: "Here's my complete morning routine using only cruelty-free products! Let me know if you want the product list.",
      likes: 24,
      comments: 7,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked,
        };
      }
      return post;
    }));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Community Discussion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="space-y-2">
              <div className="font-medium">{post.author}</div>
              <p className="text-gray-600">{post.content}</p>
              <div className="flex gap-4 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 ${post.liked ? 'text-primary' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <ThumbsUp size={16} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle size={16} />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunityForum;