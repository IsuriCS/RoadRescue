@file:Suppress("UNUSED_EXPRESSION")

package com.example.garage.views

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.garage.viewModels.GarageDashboardViewModel

@Composable
fun GarageDashboard(
    garageDetails:GarageDashboardViewModel, technicianList:List<String>
) {

    Column (
        modifier = defaultBackground,
        horizontalAlignment = Alignment.CenterHorizontally,

    ){

        Header()

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Welcome, ${garageDetails.getGarageName()}",
            color = Color(0xFF253555),
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(24.dp))

        Card(
            modifier = Modifier
                .fillMaxWidth(0.84f)
                .fillMaxHeight(0.85f)
                .verticalScroll(state = rememberScrollState()),
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
                    .fillMaxHeight(0.35f)
                    .align(Alignment.CenterHorizontally)
                    .shadow(elevation = 8.dp, shape = RectangleShape),
                colors = CardDefaults.cardColors(containerColor = Color.White),

                ) {

                var showDialog by remember { mutableStateOf(false) }

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Service Request on ${garageDetails.getDate()}",
                    color = Color(0xFF253555),
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
                Spacer(modifier = Modifier.height(8.dp))

                Divider(color = Color(0xFF253555), thickness = 2.dp)

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceAround,

                    ) {
                    Text(text = "Status", color = Color.Black, modifier = Modifier
                        .weight(1f)
                        .padding(8.dp, 0.dp))
                    Text(text = garageDetails.getStatus(),color = Color.Black, modifier = Modifier.weight(1f))
                }

                Row(
                    modifier = Modifier
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceAround,

                    ) {
                    Text(text = "Assigned Service Provider", color = Color.Black, modifier = Modifier
                        .weight(1f)
                        .padding(8.dp, 0.dp))
                    Text(text = garageDetails.getAssignServiceProvider(),color = Color.Black, modifier = Modifier.weight(1f))
                }

                Row(
                    modifier = Modifier
                        .fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceAround,

                    ) {
                    Text(text = "Service Fees", color = Color.Black, modifier = Modifier
                        .weight(1f)
                        .padding(8.dp, 0.dp))
                    Text(text = "LKR ${garageDetails.getServiceFee()}0",color = Color.Black, modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(8.dp))

                val phoneNumber="+94716788537"
                val context = LocalContext.current


                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = {

                        val intent= Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phoneNumber"))

                        context.startActivity(intent)

                    }) {
                        Icon(
                            imageVector = Icons.Default.Call,
                            contentDescription ="Contact icon",
                            tint = Color.Black
                        )
                    }

                    CommonButton(
                        btnName = "Accept",
                        modifier = Modifier.align(Alignment.CenterVertically),
                        onClickButton = {showDialog=true}
                    )

                    if (showDialog){
                        Dialog(
                            onDismissRequest = { showDialog = false },
                            content = {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth(0.9f)
                                        .fillMaxHeight(0.4f)
                                        .background(
                                            Color(0xFFACB3C0),
                                            shape = RoundedCornerShape(20.dp)
                                        ),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {

                                    var expanded by remember { mutableStateOf(false) }
                                    var selectedOption by remember { mutableStateOf("Technician") }

                                    Row (
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.End
                                    ){
                                        IconButton(onClick = { showDialog = false  }) {
                                            Icon(
                                                imageVector = Icons.Default.Close,
                                                contentDescription = "close icon",
                                                modifier = closerButtonStyles
                                            )
                                        }
                                    }


                                    Text(
                                        text = "Assign a Technician ",
                                        style = textStyle4,
                                        modifier = Modifier,
                                        textAlign = TextAlign.Center,
                                        fontSize = 24.sp
                                    )

                                    Spacer(modifier = Modifier.height(8.dp))

                                    Box(
                                        modifier = Modifier
                                            .fillMaxWidth(0.9f)
                                            .fillMaxHeight(0.2f)
                                            .background(Color.White, shape = RoundedCornerShape(20.dp))
                                            .clickable { expanded = true },
                                        contentAlignment = Alignment.Center
                                    ){

                                        Row(
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .clickable { expanded = true },
                                            horizontalArrangement = Arrangement.SpaceAround,

                                            ) {


                                            Text("$selectedOption", color = Color(0xFF253555) , style = textStyle4)


                                            Icon(
                                                imageVector = Icons.Default.KeyboardArrowDown,
                                                contentDescription = null,
                                                tint = Color(0xFF253555),
                                            )
                                        }


                                        DropdownMenu(
                                            expanded = expanded,
                                            onDismissRequest = { expanded = false },
                                            modifier = Modifier
                                                .fillMaxWidth(0.8f)
                                                .background(Color.White, shape = RoundedCornerShape(20.dp)).align(Alignment.CenterStart)
                                        ) {

                                            technicianList.forEach{technician ->

                                                DropdownMenuItem(
                                                    onClick = {
                                                        selectedOption = technician
                                                        expanded = false
                                                    },
                                                    text = { Text(text = technician, style = textStyle4, color = Color.Black) },
                                                    modifier = Modifier.fillMaxWidth()
                                                )
                                            }
                                        }

                                    }
                                }
                            }
                        )
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Footer()
    }
}
