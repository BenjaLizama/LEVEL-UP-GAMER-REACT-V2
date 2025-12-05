type AlertType = "success" | "error" | "warning";

interface QueuedAlert {
  message: string;
  type: AlertType;
  id: number;
}

type AlertSubscriber = (alert: QueuedAlert) => void;

class AlertQueue {
  private queue: QueuedAlert[] = [];
  private subscribers: AlertSubscriber[] = [];
  private isProcessing: boolean = false;

  public enqueue(message: string, type: AlertType): void {
    const newAlert: QueuedAlert = {
      message,
      type,
      id: Date.now() + Math.random(),
    };
    this.queue.push(newAlert);
    this.processNext();
  }

  private processNext(): void {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    this.isProcessing = true;
    const nextAlert = this.queue[0];

    this.subscribers.forEach((callback) => callback(nextAlert));
  }

  public finishCurrentAlert(): void {
    this.queue.shift();
    this.isProcessing = false;
    this.processNext();
  }

  public subscribe(callback: AlertSubscriber): void {
    this.subscribers.push(callback);
    this.processNext();
  }

  public unsubscribe(callback: AlertSubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }
}

export const alertQueueService = new AlertQueue();
