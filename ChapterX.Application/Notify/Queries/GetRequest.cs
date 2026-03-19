using MediatR;

namespace ChapterX.Application.Notify.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
