package com.example.garage.viewModels

import android.graphics.drawable.Drawable

class GarageProfile (
   private var _iconPath:Int,
   private var _IconName:String
){
    fun getIconPath():Int{
        return _iconPath
    }

    fun setIconPath(iconPath:Int){
        _iconPath = iconPath
    }

    fun getIconName():String{
        return _IconName
    }

    fun setIconName(numberOfPersons:String){
        _IconName=numberOfPersons
    }

}