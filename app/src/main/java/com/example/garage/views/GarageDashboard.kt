package com.example.garage.views

import android.graphics.LinearGradient
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.time.Period

@Composable
fun GarageDashboard(
    garageName:String,
    date_time:Period               /*val period: Period = Period.of(1, 2, 3) // 1 year, 2 months, and 3 days*/,
    amount:Float
) {
    /*var brush= LinearGradient(
        colors = listOf(Color(0xFFD3EFFF), Color.White),
        start = Offset(0f,0f),
        end = Offset(1f, 1f)
    )*/

    Column (
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFD3EFFF))
        ,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center

    ){
     //   Spacer(modifier = Modifier.height(4.dp))
        
        Text(
            text = "Welcome, ${garageName}",
            color = Color(0xFF253555),
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold
        )
        
        Spacer(modifier = Modifier.height(24.dp))

        Card(
            modifier = Modifier
                .fillMaxWidth(0.84f)
                .fillMaxHeight(0.85f),
            shape= RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFB6C7E3)),
            border = BorderStroke(width = 2.dp, Color.White),

        ) {
            Text(
                text = "Service Provided",
                modifier = Modifier
                    .align(Alignment.CenterHorizontally)
                    .padding(32.dp),
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF253555)
                )

            Card(
                modifier = Modifier
                    .fillMaxWidth(0.9f)
                    .fillMaxHeight(0.3f)
                    .align(Alignment.CenterHorizontally)
                    .shadow(elevation = 8.dp, shape = RectangleShape),
                colors = CardDefaults.cardColors(containerColor = Color.White),

            ) {
                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Service Request on ${date_time}",
                    color = Color(0xFF253555),
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
                Spacer(modifier = Modifier.height(8.dp))

                Divider(color = Color(0xFF253555), thickness = 2.dp)

                Row(
                    modifier = rowModifier,
                    horizontalArrangement = Arrangement.SpaceAround,

                ) {
                    Text(text = "Status", color = Color.Black)
                    Text(text = "Payment Pending",color = Color.Black)
                }

                Row(
                    modifier = rowModifier,
                    horizontalArrangement = Arrangement.SpaceAround,

                    ) {
                    Text(text = "Assigned Service Provider", color = Color.Black)
                    Text(text = "Tech Garage",color = Color.Black)
                }

                Row(
                    modifier = rowModifier,
                    horizontalArrangement = Arrangement.SpaceAround,

                    ) {
                    Text(text = "Service Fees", color = Color.Black)
                    Text(text = "LKR ${amount}0",color = Color.Black)
                }

            }
        }
    }
}