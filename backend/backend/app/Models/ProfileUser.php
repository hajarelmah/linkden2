<?php

// app/Models/ProfileUser.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'usrId',
        'city',
        'country',
        'address',
        'phone_number',
        'experience',
        'competence',
        'formation',
        'company_link',
        // Add other fields here
    ];
}

