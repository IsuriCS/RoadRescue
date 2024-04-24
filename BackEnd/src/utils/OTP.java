package utils;

import java.util.Random;

public  class OTP {
    public static String generateOTP() {
        Random random = new Random();
        int otp = random.nextInt(9000) + 1000;
        return String.valueOf(otp);
    }

}
