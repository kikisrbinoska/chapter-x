using MediatR;

namespace ChapterX.Application.Likes.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
