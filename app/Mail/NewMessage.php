<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewMessage extends Mailable
{
    use Queueable, SerializesModels;


    /**
     * The message instance.
     *
     * @var Message
     */
    public $message; 

    protected $user;
    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;        
    }
    public function build()
    {
        $url = url('/login');
        return $this->from('regexrecords@gmail.com', 'Regex records')
        ->subject('New Message')
        ->view('emails.new-message', ['user' => $this->user,
            'url' => $url,
        
    ]);
    }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     return new Content(
    //         markdown: 'emails.new-message',
    //     );
    // }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    //  */
    // public function attachments(): array
    // {
    //     return [];
    // }
}
