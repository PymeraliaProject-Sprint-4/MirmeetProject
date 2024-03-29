<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
        
    protected $table = "notifications";

    protected $fillable = [
        'message_id',
        'share_id',
        'publication_id',
        'like_id',
        'sentby_id',
        'sento_id',
        'hidden',
    ];
}
