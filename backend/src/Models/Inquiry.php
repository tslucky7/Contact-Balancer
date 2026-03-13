<?php
declare(strict_types=1);

namespace App\Models;

class Inquiry {
    
    public const STATUS_PENDING = 'pending';
    
    public const STATUS_COMPLETED = 'backlog_created';
    
    public const STATUS_FAILED = 'failed';

    public readonly string $requestId;
    
    public readonly string $name;
    
    public readonly string $email;
    
    public readonly string $subject;
    
    public readonly string $message;

    private string $status;
    
    private ?int $backlogIssueId = null;
    
    private ?string $backlogIssueKey = null;
    
    private ?string $errorMessage = null;

    public function __construct(
      string $requestId,
      string $name,
      string $email, 
      string $subject,
      string $message,
      string $status
    ) {
        $this->requestId = $requestId;
        $this->name = $name;
        $this->email = $email;
        $this->subject = $subject;
        $this->message = $message;
        $this->status = $status;
    }

    public function getStatus(): string { 
      return $this->status; 
    }

    public function getBacklogIssueId(): ?int { 
      return $this->backlogIssueId; 
    }

    public function getBacklogIssueKey(): ?string { 
      return $this->backlogIssueKey; 
    }

    public function getErrorMessage(): ?string {
      return $this->errorMessage;
    }

    public function complete(int $issueId, string $issueKey): void {
        $this->status = self::STATUS_COMPLETED;
        $this->backlogIssueId = $issueId;
        $this->backlogIssueKey = $issueKey;
    }

    public function fail(string $message): void {
        $this->status = self::STATUS_FAILED;
        $this->errorMessage = $message;
    }
}
