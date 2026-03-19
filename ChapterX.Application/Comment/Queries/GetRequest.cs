using MediatR;

namespace ChapterX.Application.Comment.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
