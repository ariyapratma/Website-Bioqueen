<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated user.
     */
    public function index()
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $notifications = Notification::where('user_id', auth()->id())
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($notifications);
        } catch (\Exception $e) {
            Log::error('Error fetching notifications:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch notifications.'], 500);
        }
    }

    /**
     * Mark a single notification as read.
     */
    public function markAsRead($id)
    {
        try {
            $notification = Notification::where('user_id', auth()->id())->findOrFail($id);
            $notification->update(['read' => true]);

            Log::info('Marked notification as read:', ['notification_id' => $id, 'user_id' => auth()->id()]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error marking notification as read:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to mark notification as read.'], 500);
        }
    }

    /**
     * Mark all notifications as read for the authenticated user.
     */
    public function markAllAsRead()
    {
        try {
            Notification::where('user_id', auth()->id())
                ->where('read', false)
                ->update(['read' => true]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error marking all notifications as read:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to mark all notifications as read.'], 500);
        }
    }

    /**
     * Delete a single notification.
     */
    public function destroy($id)
    {
        try {
            $notification = Notification::where('user_id', auth()->id())->findOrFail($id);

            $notification->delete();

            Log::info('Deleted notification:', ['notification_id' => $id, 'user_id' => auth()->id()]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error deleting notification:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to delete notification.'], 500);
        }
    }

    /**
     * Delete all notifications for the authenticated user.
     */
    public function destroyAll()
    {
        try {
            // Hapus semua notifikasi milik user
            $deletedCount = Notification::where('user_id', auth()->id())->delete();

            // Logging untuk debugging
            Log::info('Deleted all notifications:', ['user_id' => auth()->id(), 'deleted_count' => $deletedCount]);

            return response()->json(['success' => true, 'deleted_count' => $deletedCount]);
        } catch (\Exception $e) {
            Log::error('Error deleting all notifications:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to delete all notifications.'], 500);
        }
    }
}
