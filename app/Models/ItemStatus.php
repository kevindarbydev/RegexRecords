<?php

namespace App\Models;

enum ItemStatus: string
{
    case Sold = "Sold";
    case Shipped = "Shipped";
    case Received = "Received";
}
