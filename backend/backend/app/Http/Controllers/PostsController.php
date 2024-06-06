<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Posts;
use App\Models\user_comments;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function getposts()
    {
        $posts = Posts::all();
        return response()->json($posts);
    }

    public function post(Request $request)
    {
        // Log the request data
        Log::info('Request data:', $request->all());

        // Validate the request data
     

        // Create a new post instance
        $post = new Posts();
        $post->username = $request->username;
        $post->comment = $request->comment;
        $post->post_owner_id = $request->post_owner_id;

        // Check if the request contains an image file
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }
            $image->move($destinationPath, $imageName);
            $post->image = '/images/' . $imageName;
        }

        // Save the post to the database
        if ($post->save()) {
            Log::info('Post saved:', $post->toArray());
            return response()->json(['message' => 'Post created successfully', 'post' => $post], 200);
        } else {
            return response()->json(['message' => 'Failed to create post'], 500);
        }
    }
    public function likeUpdate(Request $request)
    {
        // Validate the request to ensure 'post_id' is present
     

        // Retrieve the post by its ID
        $post = Posts::find($request->id);

        if ($post) {
            // Increment the like counter
            $post->likes += 1;

            // Save the updated post
            $post->save();

            return response()->json([
                'success' => true,
                'message' => 'Like counter updated successfully.',
                'likes' => $post->likes
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Post not found.'
            ], 404);
        }
    }
    public function likeCount(Request $req)
    {
        // Find the post by its ID
        $post = Posts::find($req->id);
    
        // Check if the post exists
        if ($post) {
            // Return the number of likes
            return response()->json(['likes' => $post->likes], 200);
        }
    
        // Return an error response if the post is not found
        return response()->json(['message' => 'Post not found'], 404);
    }
    
    public function comments(Request $request, $postId)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_pfp' => 'string',
            'username' => 'string',
            'content' => 'string',
        ]);
    
        try {
            // Create a new comment instance
            $comment = new user_comments();
            $comment->user_pfp = $validatedData['user_pfp'];
            $comment->username = $validatedData['username'];
            $comment->content = $validatedData['content'];
            $comment->post_id = $postId;

    
            // Save the comment
            $comment->save();
    
            // Update the corresponding post to associate the comment ID
            DB::table('posts')->where('id', $postId)->update(['comments_id' => $comment->id]);
    
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function getPostComments(Request $request){
        try {
            // Validate the request data if needed
    
            // Get the post_id from the request
            $post_id = $request->post_id;
    
            // Retrieve comments for the given post_id
            $comments = user_comments::where('post_id', $post_id)->get();
    
            // Check if there are any comments
            if($comments->isEmpty()) {
                return response()->json(['message' => 'No comments found for this post'], 400);
            }
    
            // Return the comments
            return response()->json($comments, 200);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    
}
