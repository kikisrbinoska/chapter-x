using MediatR;

namespace ChapterX.Application.Chapter.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
