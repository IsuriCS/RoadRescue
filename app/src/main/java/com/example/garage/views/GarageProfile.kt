package com.example.garage.views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun garageProfile(

){
    Column(
        modifier = defaultBackground,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Card (
            modifier = cardDefaultModifier,
            colors = CardDefaults.cardColors(containerColor = Color(0xFFB6C7E3)),
            border = BorderStroke(width = 2.dp, Color.White)
        ){

            Row (modifier = Modifier.fillMaxWidth().background(Color.Red).fillMaxHeight(0.17f)){

                /*Column {
                    //image
                }

                Column {
                    // details
                }*/

            }

            Row(modifier = Modifier.fillMaxWidth().background(Color.Yellow).fillMaxHeight(0.17f)) {

            }

            Row(modifier = Modifier.fillMaxWidth().background(Color.Green).fillMaxHeight(0.17f)) {

            }

            Row (modifier = Modifier.fillMaxWidth().background(Color.White).fillMaxHeight(0.17f)){

            }

            Row (modifier = Modifier.fillMaxWidth().background(Color.Magenta).fillMaxHeight(0.17f)){

            }

        }
    }
}