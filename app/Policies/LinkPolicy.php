<?php

namespace App\Policies;

use App\Models\Link;
use App\Models\User;

class LinkPolicy
{
    public function modify(User $user, Link $link): bool
    {
        return $user->id === $link->user_id;
    }
}
