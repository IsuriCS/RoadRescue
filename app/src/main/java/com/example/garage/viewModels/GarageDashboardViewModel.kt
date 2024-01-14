package com.example.garage.viewModels

import java.time.Period

class GarageDashboardViewModel(
    private var _garageName: String,
    private var _date: Period,
    private var _status: String,
    private var _assignServiceProvider: String,
    private var _serviceFee: Double,

    ) {

    fun getGarageName(): String {
        return _garageName
    }

    fun setGarageName(garage: String) {
        this._garageName = garage
    }

    fun getDate(): Period {
        return _date
    }

    fun setDate(date: Period) {
        this._date
    }

    fun getStatus(): String {
        return _status
    }

    fun setStatus(status: String) {
        this._status = status
    }

    fun getAssignServiceProvider(): String {
        return _assignServiceProvider
    }

    fun setAssignServiceProvider(assignServiceProvider: String) {
        this._assignServiceProvider = assignServiceProvider
    }

    fun getServiceFee(): Double {
        return _serviceFee
    }

    fun setServiceFee(serviceFee: Double) {
        this._serviceFee
    }


}