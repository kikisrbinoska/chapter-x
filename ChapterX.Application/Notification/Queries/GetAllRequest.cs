using MediatR;

namespace ChapterX.Application.Notification.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
