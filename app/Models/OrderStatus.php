<?php

namespace App\Models;

enum OrderStatus: String
{
    case Submitted = "Submitted";
    case Processed = "Processed";
    case Completed = "Completed";
}
