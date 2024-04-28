<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'password',
        'created_at',
        'updated_at',
        'full_name',
        'user_name',
        'gender',
        'bio',
        'date_of_birth',
    ];
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
}
