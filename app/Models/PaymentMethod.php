<?php

namespace App\Models;

use App\Models\OrderInformation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function orderInformations()
    {
        return $this->hasMany(OrderInformation::class, 'payment_method_id');
    }
}
