package com.example.garage.views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.substring
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.garage.R

@Composable
fun garageProfile(
    garageName:String,
    garageId:String,
    ownerName:String
){
    Column(
        modifier = defaultBackground,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Card (
            modifier = cardDefaultModifier,
            colors = CardDefaults.cardColors(containerColor = Color(0xFFB6C7E3)),
            border = BorderStroke(width = 2.dp, Color.White),
        ){

            Row (modifier = Modifier
                .weight(1f)
            ){
                    // set profile pitcher
                Card(
                    shape = CircleShape,
                    border = BorderStroke(width = 2.dp, color = Color.White),
                    modifier = Modifier
                        .weight(1f)
                        .padding(8.dp)
                        .fillMaxHeight(0.2f)
                ) {

                    Image(
                        painter = painterResource(id = R.drawable.user_fill),
                        contentDescription ="my pitcher",
                        contentScale = ContentScale.FillBounds,
                        modifier = Modifier
                            .fillMaxSize()
                            .background(Color(0xDFFFFFFF))
                    )
                }


                Box(
                    modifier = Modifier
                        .weight(1f)
                        .padding(0.dp, 14.dp, 2.dp)
                ){

                    Column {
                        Text(
                            text = buildAnnotatedString {
                                withStyle(
                                    style = SpanStyle(
                                        fontSize = 50.sp
                                    )
                                ) {
                                    append(garageName[0])
                                }
                                append(garageName.substring(1))

                                withStyle(
                                    style = SpanStyle(
                                        fontSize = 50.sp
                                    )
                                ) {
                                    append(" G")
                                }
                                append("arage")

                            },
                            color = Color(0xFF253555),
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 30.sp,
                            fontFamily = FontFamily.Serif,
                            textAlign = TextAlign.Justify,
                            maxLines = 3,
                            lineHeight = 50.sp
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = "$garageId",
                            color = Color(0xB3000000),
                            fontWeight = FontWeight.ExtraBold,
                            fontSize=20.sp,
                        )

                        Text(
                            text = "$ownerName",
                            color = Color(0xB3000000),
                            fontWeight = FontWeight.ExtraBold,
                            fontSize=20.sp
                        )
                    }

                }
            }



        }
    }
}