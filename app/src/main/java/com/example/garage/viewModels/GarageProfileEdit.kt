package com.example.garage.viewModels

class GarageProfileEdit (
    private var _checkBoxName:String,
    private  var _isSelected:Boolean
){

    fun getCheckBoxName():String{
        return _checkBoxName
    }

    fun setCheckBoxName(checkBoxName:String){
       this._checkBoxName=checkBoxName
    }

    fun getIsSelected():Boolean{
        return _isSelected
    }

    fun setIsSelected(isSelected:Boolean){
        this._isSelected=isSelected
    }

}