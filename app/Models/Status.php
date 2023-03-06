<?php

namespace App\Models;

enum Status
{
    case Sold;
    case Shipped;
    case Received;
    case OrderPlaced;
    case OrderCompleted;
}
