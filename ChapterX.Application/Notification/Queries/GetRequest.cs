using MediatR;

namespace ChapterX.Application.Notification.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
