import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import Toast from '../components/Toast';
import ContactModal from '../components/ContactModal';

// ---------------------------------------------------------------------------
// ErrorBoundary
// ---------------------------------------------------------------------------

const ThrowingChild: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders fallback when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText('This section is currently unavailable due to a technical error.'),
    ).toBeInTheDocument();
  });

  it('renders children normally when no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="safe-child">Hello</div>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('safe-child')).toBeInTheDocument();
  });

  it('renders custom fallback prop when child throws', () => {
    const customFallback = <div data-testid="custom-fallback">Custom Error UI</div>;
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowingChild />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.queryByText('This section is currently unavailable')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders when visible', () => {
    const onClose = vi.fn();
    render(<Toast message="Email copied" isVisible={true} onClose={onClose} />);
    expect(screen.getByText('Email copied')).toBeInTheDocument();
  });

  it('renders nothing when not visible', () => {
    const onClose = vi.fn();
    render(<Toast message="Email copied" isVisible={false} onClose={onClose} />);
    expect(screen.queryByText('Email copied')).not.toBeInTheDocument();
  });

  it('calls onClose after 3 seconds', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" isVisible={true} onClose={onClose} />);
    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// ContactModal
// ---------------------------------------------------------------------------

describe('ContactModal', () => {
  it('renders nothing when closed', () => {
    render(<ContactModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText("Let's Connect")).not.toBeInTheDocument();
  });

  it('renders contact options when open', () => {
    render(<ContactModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    // Email, LinkedIn, Resume options are visible
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen={true} onClose={onClose} />);
    // The backdrop is the absolute div behind the modal content
    const backdrop = document.querySelector('.absolute.inset-0') as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
