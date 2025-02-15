<?php

namespace App\Models;

use App\Models\OrderInformation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingMethod extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function orderInformations()
    {
        return $this->hasMany(OrderInformation::class, 'shipping_method_id');
    }
}
