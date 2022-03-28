<?php


namespace App\Http\helpers;


class helpers
{

    public function sendMail($title,$body){

        \Mail::to('mohammedridabric@gamil.com')->send(new \App\Mail\ProductMail([
            'title' =>$title,
            'body' => $body
        ]));

    }

}
