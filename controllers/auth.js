'use strict';

exports.login = (req, res) => {
    res.render('auth/login');
};

exports.dashboard = (req, res) => {
    res.render('dashboard/index');
};