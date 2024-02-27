package models;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
public class TimeStampFormatter {



        public Timestamp timestamp;

        public TimeStampFormatter(Timestamp timestamp) {
            this.timestamp = timestamp;
        }

        public String extractDate() {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return dateFormat.format(timestamp);
        }

        public String extractTime() {
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
            return timeFormat.format(timestamp);
        }

        public int extractMonth() {
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(timestamp.getTime());
            return calendar.get(Calendar.MONTH) + 1; // Adding 1 because Calendar.MONTH is zero-based
        }

        // You can add more methods here to extract other components of the timestamp if needed


}
