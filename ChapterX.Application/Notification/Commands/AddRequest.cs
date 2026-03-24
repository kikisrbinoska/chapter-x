using MediatR;

namespace ChapterX.Application.Notification.Commands
{
    public record AddRequest(string Content, int? RecipientUserId = null, string? Type = null, string? Link = null) : IRequest<AddResponse>;
}
