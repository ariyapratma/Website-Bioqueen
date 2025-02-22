<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated user.
     */
    public function index()
    {
        // Ambil semua notifikasi milik user yang sedang login
        $notifications = Notification::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc') // Urutkan dari yang terbaru
            ->get();

        return response()->json($notifications); // Kembalikan sebagai JSON
    }

    /**
     * Mark a single notification as read.
     */
    public function markAsRead($id)
    {
        // Temukan notifikasi berdasarkan ID dan pastikan milik user yang sedang login
        $notification = Notification::where('user_id', auth()->id())->findOrFail($id);

        // Update status notifikasi menjadi "dibaca"
        $notification->update(['read' => true]);

        return response()->json(['success' => true]); // Kembalikan respons sukses
    }

    /**
     * Mark all notifications as read for the authenticated user.
     */
    public function markAllAsRead()
    {
        // Tandai semua notifikasi milik user sebagai "dibaca"
        Notification::where('user_id', auth()->id())
            ->where('read', false) // Hanya tandai yang belum dibaca
            ->update(['read' => true]);

        return response()->json(['success' => true]); // Kembalikan respons sukses
    }
}
