package com.example.garage.views

import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.garage.ui.theme.GarageTheme
import com.example.garage.views.Header
import java.time.Period

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            GarageTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    //Header()
//                    Footer()
                  //HelpBox()
                    //SidebarContent()
                    /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        GarageDashboard("Tharindu Dakshina", Period.of(1,2,3),2500f)
                    }*/

                    garageProfile()
                }
            }
        }
    }
}

