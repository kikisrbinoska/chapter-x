using MediatR;

namespace ChapterX.Application.Status.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
