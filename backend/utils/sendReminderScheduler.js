import 'dotenv/config'; // loads .env automatically
import cron from 'node-cron';
import Event from '../models/Event.js';
import webpush from 'web-push';

// Safety: verify VAPID keys exist
const PUBLIC = process.env.VAPID_PUBLIC_KEY;
const PRIVATE = process.env.VAPID_PRIVATE_KEY;

if (!PUBLIC || !PRIVATE) {
  console.warn('❌ Reminder scheduler disabled due to missing VAPID keys.');
  startScheduler = () => {
    console.warn('Scheduler disabled');
  }
} else {
  // Configure web-push
  webpush.setVapidDetails('mailto:arnav007sxn@gmail.com', PUBLIC, PRIVATE);

  startScheduler = () => {
    console.log('✔ Reminder scheduler started (checks every minute)');

    cron.schedule('* * * * *', async () => {
      try {
        const now = Date.now();
        const from = new Date(now + 29 * 60 * 1000);
        const to = new Date(now + 31 * 60 * 1000);

        const events = await Event.find({
          status: 'upcoming',
          date: { $gte: from, $lte: to },
        }).populate('user');

        for (const ev of events) {
          const user = ev.user;
          if (!user || !user.pushSubscription) continue;

          const payload = JSON.stringify({
            title: `Reminder: ${ev.title}`,
            body: `Starts at ${new Date(ev.date).toLocaleString()}`,
          });

          try {
            await webpush.sendNotification(user.pushSubscription, payload);
            console.log('Sent push for', ev.title, '->', user.email || user._id);
          } catch (err) {
            console.error(
              'Push send failed for',
              user.email || user._id,
              err?.statusCode || err?.message || err
            );
            // Optional: remove expired subscriptions from DB here
          }
        }
      } catch (err) {
        console.error('Scheduler error', err);
      }
    });
  }
}

export default startScheduler();
