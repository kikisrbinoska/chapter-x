using MediatR;

namespace ChapterX.Application.ContentType.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
