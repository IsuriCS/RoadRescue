package utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SMS {
    public static void smsApi(String otp,String contactNumber) {
        try {
            // Construct the URL with parameters

            Pattern pattern = Pattern.compile("\\+?(\\d+)");
            Matcher matcher = pattern.matcher(contactNumber);

            System.out.println(contactNumber);
            if (matcher.find()) {
                System.out.println(matcher.group(1));
            } else {
                System.out.println("Type not found in the input string.");
            }
            System.out.println("111111111"+matcher.group(1));
            String url = "https://app.notify.lk/api/v1/send";
            String userId = "27058";
            String apiKey = "FAK3nuHgUVGeXHPWQZBK";
            String senderId = "NotifyDEMO";
            String to = matcher.group(1);
            String message = "Code : "+otp+"\n Please use above Road Rescue Code/OPT to complete Your allocation\n\n.........********.........";

            String urlString = String.format("%s?user_id=%s&api_key=%s&sender_id=%s&to=%s&message=%s",
                    url, userId, apiKey, URLEncoder.encode(senderId, "UTF-8"),
                    URLEncoder.encode(to, "UTF-8"), URLEncoder.encode(message, "UTF-8"));

            // Create a URL object
            URL obj = new URL(urlString);

            // Open a connection
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Set the request method
            con.setRequestMethod("GET");

            // Get the response code
            int responseCode = con.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            // Read the response
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Print the response
            System.out.println(response.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}